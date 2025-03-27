variable "aws_region" {
  default = "eu-west-2"
}

variable "project_name" {
  default = "one-plus-zero"
}

variable "environment" {
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}