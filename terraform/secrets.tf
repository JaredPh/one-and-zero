data "aws_secretsmanager_secret" "zero" {
  name = "${var.project_name}/zero/${var.environment}"
}

data "aws_secretsmanager_secret_version" "zero_version" {
  secret_id = data.aws_secretsmanager_secret.zero.id
}


locals {
  zero_postgres_credentials = jsondecode(data.aws_secretsmanager_secret_version.zero_version.secret_string)
}
