#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting dependency installation...${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed. Please install Node.js and npm first.${NC}"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in the current directory.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${BLUE}Running npm install...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dependencies installed successfully!${NC}"
    echo -e "${BLUE}You can now start the development server with: ${GREEN}npm run dev${NC}"
else
    echo -e "${RED}Failed to install dependencies.${NC}"
    exit 1
fi
