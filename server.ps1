# Tamada Companion HTTP Web Server
$port = 8081
$prefix = "http://localhost:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Tamada Companion Server started at $prefix"

$root = "C:\Users\t.kumsiashvili\.gemini\antigravity-ide\scratch\tamada-companion"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/") { $urlPath = "/index.html" }
    
    $filePath = [System.IO.Path]::Combine($root, $urlPath.TrimStart('/').Replace('/', '\'))
    
    if (Test-Path $filePath -PathType Leaf) {
      $bytes = [System.IO.File]::ReadAllBytes($filePath)
      $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
      
      switch ($ext) {
        ".html" { $response.ContentType = "text/html; charset=utf-8" }
        ".css"  { $response.ContentType = "text/css" }
        ".js"   { $response.ContentType = "text/javascript; charset=utf-8" }
        ".json" { $response.ContentType = "application/json" }
        ".png"  { $response.ContentType = "image/png" }
        ".svg"  { $response.ContentType = "image/svg+xml" }
        default { $response.ContentType = "application/octet-stream" }
      }
      
      $response.ContentLength64 = $bytes.Length
      $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $response.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("File Not Found")
      $response.ContentLength64 = $msg.Length
      $response.OutputStream.Write($msg, 0, $msg.Length)
    }
    $response.Close()
  }
} finally {
  $listener.Stop()
}
