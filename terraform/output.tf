output "service_url" {
  value = google_cloud_run_service.genkit.status[0].url
}