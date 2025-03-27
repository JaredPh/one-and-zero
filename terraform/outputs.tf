output "database_endpoint" {
  description = "The connection endpoint for the RDS instance"
  value       = module.database.zero_postgres_endpoint
}
