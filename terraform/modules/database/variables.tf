variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
}

variable "project_name" {
  description = "Name of the project"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
}

variable "postgres_credentials" {
  description = "Postgres credentials"
  type = object({
    username = string
    password = string
  })
}

variable "zero_app_database_name" {
  description = "Name of the database for the zero app"
  type        = string
  default     = "onezero_app"
}
