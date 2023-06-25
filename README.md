# Database Manager

## Description
The Database Manager is a microservice for managing the MongoDB database. It provides an API for performing CRUD operations on database collections.
## Installation

Make sure you have Node.js and npm (or Yarn) installed in your development environment.

1. Clone the Database Manager repository:

```bash
git clone https://github.com/Leechineo/ms-database-manager.git
```
2. Navigate to the project directory:
```bash
cd ms-database-manager
```
3. Install the dependencies using Yarn or Npm:
```bash
yarn
```
or
```bash
npm i
```
## Configuration

Before starting the Database Manager, you need to configure the `MS_DB_MANAGER_DBURL` environment variable with the URL of the MongoDB database to be used. Make sure you have a running MongoDB database and set the environment variable accordingly. For example:
```bash
export MS_DB_MANAGER_DBURL=mongodb://localhost:27017/database-name
```
Alternatively, you can create a `.env` file in the project root directory and add the following line, replacing `mongodb://localhost:27017/database-name` with your MongoDB database URL:
```bash
echo "MS_DB_MANAGER_DBURL=mongodb://localhost:27017/database-name" > .env
```

## Usage

There are two ways to run the Database Manager: development mode and production mode.

### Development Mode

In development mode, the server will automatically restart whenever there are code changes. Run the following command to start the Database Manager in development mode:
```bash
yarn dev
```
or
```bash
npm run dev
```

### Production Mode

In production mode, the server is started without the auto-restart feature. Run the following command to start the Database Manager in production mode:

```bash
yarn start
```
or
```bash
npm start
```

## API Routes

#### Create a new document in the specified model collection.

```http
POST /:model
```
You need to provide the document data in the request body, following the model structure.
#### Get model items

```http
GET /:model
```
To filter the items, you can use the following query strings:
| Query String   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Optional** - The document id. |
| `filters` | `string` - (formatted as JSON) | **Optional** - Document filters. |

#### Update documents in the specified model collection.
```http
PATCH /:model
```
To update documents, you need to provide at least one of the following query strings:
| Query String   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | The document id. |
| `filters` | `string` - (formatted as JSON) | Document filters. |

You also need to provide the updated document data in the request body, following the model structure.

#### Delete documents from the specified model collection.

```http
DELETE /:model
```
To delete documents, you need to provide at least one of the following query strings:
| Query String   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | The document id. |
| `filters` | `string` - (formatted as JSON) | Document filters. |


## About models

The models can be found in the `src/models` directory. To use them in the API, specify the file name (excluding the `.js` extension) as the `/:model` parameter, respecting case sensitivity. For example:

For the `Brand.js` model:

```http
POST /Brand?id=64964f5522c513c0b4fa3266
```


## License

This project is licensed under the [GPL 3.0 License](/LICENSE)
