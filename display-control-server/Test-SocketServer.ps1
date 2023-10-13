# Define the server IP address and port
$ipaddress = "127.0.0.1"
$port = 8000

# Create a TCP client
$client = New-Object System.Net.Sockets.TcpClient

# Connect to the server
$client.Connect($ipaddress, $port)

# Get the client stream
$stream = $client.GetStream()

# Define the message as a JSON string and convert it to bytes
$jsonObject = @{
    command = "display_image"
    image_filename = "doggo.jpg"
} | ConvertTo-Json

$bytes = [System.Text.Encoding]::ASCII.GetBytes($jsonObject)

# Send the message
$stream.Write($bytes, 0, $bytes.Length)

# Read the response
$buffer = New-Object Byte[] 1024
$read = $stream.Read($buffer, 0, 1024)
$response = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $read)

# Display the response
Write-Output "Received: $response"

# Close the stream and the client
$stream.Close()
$client.Close()