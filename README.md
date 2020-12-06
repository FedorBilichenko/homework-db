# **Запуск**
    docker-compose build
    docker-compose up
# **Использование**
    Сервер поднимается на http://localhost:3000

### **Доступные методы**
#### Получение всех авторов
    GET http://localhost:3000/api/author/list

#### Создание автора
    POST http://localhost:3000/api/author/create
    
    тело запроса
     {
        "name": [имя]
     }

#### Получение всех менеджеров
    GET http://localhost:3000/api/manager/list
    
#### Создание менеджера
    POST http://localhost:3000/api/manager/create
    
    тело запроса
     {
        "name": [имя]
     }

#### Получение всех дисков
    GET http://localhost:3000/api/disk/list

#### Создание диска
    POST http://localhost:3000/api/disk/create
    
    тело запроса
     {
        "name": [название диска],
        "count": [количество],
        "price": [цена],
        "author_id": [id автора]
     }
 
 #### Удаление всех дисков
     POST http://localhost:3000/api/disk/remove_all
 
#### Удаление всех менеджеров
    POST http://localhost:3000/api/manager/remove_all

#### Удаление всех авторов
    POST http://localhost:3000/api/author/remove_all

#### Создание заказа
    POST http://localhost:3000/api/order/create
    
    тело запроса
     {
        "disk_id": [id диска],
        "manager_id": [количество]
     }

#### Получение всех заказов
    GET http://localhost:3000/api/order/list
    
#### Получение менеджеров с количеством заказов
    GET http://localhost:3000/api/manager/list_with_orders

#### Получение диска по id
    GET http://localhost:3000/api/disk/get
    
    тело запроса
     {
        "id": [id диска],
     }
     
 #### Получение диска по названию
     GET http://localhost:3000/api/disk/get_by_name
     
     тело запроса
      {
         "name": [название диска],
      }