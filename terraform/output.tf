output "service_url" {
  value       = google_cloud_run_service.genkit.status[0].url
  description = "The URL of the deployed Cloud Run service"

  depends_on = [
    google_cloud_run_service_iam_policy.noauth
  ]
}