# Use the official Node.js 20.10 image as a parent image
FROM node:20.10

# Add 32-bit architecture
RUN dpkg --add-architecture i386

# Install dependencies
RUN apt-get update && apt-get install -y wget gnupg2 software-properties-common

# Add WineHQ repository
RUN wget -qO - https://dl.winehq.org/wine-builds/winehq.key | apt-key add -
RUN echo "deb https://dl.winehq.org/wine-builds/debian/ buster main" | tee /etc/apt/sources.list.d/wine.list

# Update package lists
RUN apt-get update

RUN apt-get install -y wine

# Install Wine
# RUN apt-get install -y --install-recommends  winehq-stable

# Set the working directory
WORKDIR /app