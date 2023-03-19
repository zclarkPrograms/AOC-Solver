# Use the latest Ubuntu LTS release as the base image
FROM ubuntu:latest

# Update the package list and install the necessary packages
RUN apt-get update && apt-get install -y python3 python3-pip openjdk-11-jdk nodejs

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app
