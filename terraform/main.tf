terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "466322313810-terraform-state"
    key            = "umpire.tfstate"
    region         = "eu-west-2"
    profile        = "umpire"
    dynamodb_table = "umpire-terraform-state-lock"
  }
}

provider "aws" {
  region  = var.aws_region
  profile = "umpire"
}

resource "aws_dynamodb_table" "terraform_state_lock" {
  name         = "umpire-terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Project = var.project_name
  }
}