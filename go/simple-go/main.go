package main

import (
    "encoding/json"
    "log"
    "strconv"

    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/logger"

    "simplego/product"
    "simplego/storage"
)

type SimpleResponse struct {
    Message string
}

func main() {
    db := storage.New()
    app := fiber.New()
    app.Use(logger.New(logger.Config{
        Format: "[${time}] ${status} ${latency} ${method} ${path}\n",
    }))

    app.Get("/", func(c *fiber.Ctx) error {
        return c.SendString("Hello, World 👋!")
    })

    app.Get("/products", func(c *fiber.Ctx) error {
        response, _ := json.Marshal(db.All())
        return c.Send(response)
    })

    app.Post("/products", func(c *fiber.Ctx) error {
        p := product.Product{}

        // parse request body / form
        if err := c.BodyParser(&p); err != nil {
            return err
        }

        p.ID = db.GetNextKey()
        db.Store(p.ID, p)

        response, _ := json.Marshal(p)
        return c.Send(response)
    })

    app.Patch("/products/:id/sold", func(c *fiber.Ctx) error {
        id, _ := strconv.Atoi(c.Params("id"))
        res, found := db.Get(id)
        if !found {
            response, _ := json.Marshal(SimpleResponse{"Not Found."})
            return c.Send(response)
        }

        p := res.(product.Product)

        product.SoldUpdate(p)
        db.Store(p.ID, p)

        response, _ := json.Marshal(p)
        return c.Send(response)
    })

    log.Println("Application is running on port 3000")
    app.Listen(":3000")
}
