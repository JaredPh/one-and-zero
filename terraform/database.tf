data "aws_secretsmanager_secret" "zero_postgres_credentials" {
  name = "${var.project_name}/zero_postgres/credentials/${var.environment}"
}

data "aws_secretsmanager_secret_version" "zero_postgres_credentials_version" {
  secret_id = data.aws_secretsmanager_secret.zero_postgres_credentials.id
}

locals {
  zero_postgres_credentials = jsondecode(data.aws_secretsmanager_secret_version.zero_postgres_credentials_version.secret_string)
}

resource "aws_iam_service_linked_role" "zero_postgres" {
  aws_service_name = "rds.amazonaws.com"
  description      = "Service linked role for RDS"
}

resource "aws_db_subnet_group" "zero_postgres" {
  name       = "zero-postgres-subnet-group-${var.environment}"
  subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id]

  depends_on = [aws_iam_service_linked_role.zero_postgres]

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_security_group" "zero_postgres" {
  name        = "zero-postgres-sg-${var.environment}"
  description = "Security group for PostgreSQL RDS"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "PostgreSQL from anywhere"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_db_parameter_group" "zero_postgres" {
  family = "postgres17"
  name   = "zero-postgres-parameters"

  parameter {
    name         = "rds.logical_replication"
    value        = "1"
    apply_method = "pending-reboot"
  }
}

resource "aws_db_instance" "zero_postgres" {
  identifier           = "${var.project_name}-zero-${var.environment}"
  engine               = "postgres"
  engine_version       = "17.2"
  instance_class       = "db.t4g.micro"
  parameter_group_name = aws_db_parameter_group.zero_postgres.name

  storage_encrypted = true

  allocated_storage     = 20
  max_allocated_storage = 20

  username = local.zero_postgres_credentials.username
  password = local.zero_postgres_credentials.password

  skip_final_snapshot = var.environment == "prod" ? false : true

  publicly_accessible    = true
  vpc_security_group_ids = [aws_security_group.zero_postgres.id]
  db_subnet_group_name   = aws_db_subnet_group.zero_postgres.name

  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  depends_on = [aws_db_subnet_group.zero_postgres]

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}