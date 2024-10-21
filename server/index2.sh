# Define the base email, URL, and other parameters
BASE_EMAIL="chuan14402+"
URL="http://localhost:8080/auth/register"
PASSWORD="123"
ROLE="ROLE_CUSTOMER"
NAME="AnChu"

# Function to send a single request
send_request() {
  EMAIL="chuan14402@gmail.com"
  curl --location "$URL" \
  --header 'Content-Type: application/json' \
  --data-raw "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"role\": \"$ROLE\",
    \"name\": \"$NAME\"
  }" &
}

# Loop to send 90 requests, in batches of 30
for batch in {1..1000}; do
    send_request "$i"  
done
