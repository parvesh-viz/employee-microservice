# Employee Microservice (VirtualBox Project)

## Overview
This project demonstrates deployment of a Node.js-based employee microservice
across multiple virtual machines using Oracle VirtualBox.

## Architecture
- **Service VM**: Ubuntu 24.04 LTS  
  IP: `192.168.56.10`  
  Runs Node.js + Express + SQLite  
- **Client VM**: Ubuntu 24.04 LTS  
  IP: `192.168.56.11`  
  Accesses API using curl  
- **Network**: VirtualBox Internal Network (`intnet`)
- **Port**: 3000

## Features
- REST API for employee information
- SQLite database backend
- Static IP networking
- Internal VM communication

## API Endpoints
- `GET /employees`
- `GET /employees/{id}`

## How to Run (Service VM)
```bash
npm install
node index.js
