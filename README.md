# CurvvTech

## Steps for Installation

### Method 1 (Manual)

**1.Clone the project**

```bash
  git clone <repository>
```

**2.Navigate to project-directory**

```bash
  cd my-backend
```

**3.Install the dependencies**

```bash
  npm install
```

**4.Copy the .env.example file into .env file and add your credentials**

```bash
  cp .env.example .env
```

**5.Start the server**

```bash
  npm run server
```

### Method 2 (via Docker)

**1.Clone the project**

```bash
  git clone <repository>
```

**2.Navigate to project-directory**

```bash
  cd my-backend
```

**3.Build Docker Image**

```bash
  docker build -t my-backend .
```

**4.Copy the .env.example file into .env file and add your credentials**

```bash
  cp .env.example .env
```

**5.Run the docker container**

```bash
  docker run -p 3000:3000 --env-file .env --name backend-container my-backend
```

## API Reference

### _1. User Management_

#### Sign-Up

```http
  POST /auth/signup
```

| Parameter  | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |
| `role`     | `string` | **Required**. |

#### Login

```http
  POST /auth/login
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. Id of item to fetch |
| `password` | `string` | **Required**.                     |

### _2. Device Management_

#### Register a Device

```http
  POST /devices
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Id of item to fetch |
| `type`    | `string` | **Required**.                     |
| `status`  | `string` | **Required**.                     |

#### Fetch all Devices

```http
  GET /devices?type=light&status=active
```

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `type`    | `string` | **Optional**. |
| `status`  | `string` | **Optional**. |

#### Update the Device

```http
  PATCH /devices/:id
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the item to update |
| `name`    | `string` | **Optional**.                          |
| `type`    | `string` | **Optional**.                          |
| `status`  | `string` | **Optional**.                          |

#### Delete the Device

```http
  DELETE /devices/:id
```

| Parameter | Type     | Description                              |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `string` | **Required**. Id of the device to delete |

#### Register a heartbeat

```http
  POST /devices/:id/heartbeat
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Id of the device |
| `status`  | `string` | **Required**.                  |

### _3. Data And Analytics_

#### Create Log Entry

```http
  POST /devices/:id/logs
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Id of the device |
| `event`   | `string` | **Required**.                  |
| `value`   | `string` | **Required**.                  |

#### Fetch last 10 logs

```http
  GET /devices/:id/logs?limit=10
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Id of the device |
| `limit`   | `string` | **Optional**.                  |

#### Get Aggregated usage

```http
  GET /devices/:id/usage?range=24h
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `id`      | `string` | **Required**. Id of the device |
| `range`   | `string` | **optional**.                  |
