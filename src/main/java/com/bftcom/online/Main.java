package com.bftcom.online;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Точка входа в приложение.
 */
@SpringBootApplication
public class Main {
    /**
     * Запуск приложения.
     * @param args Параметры запуска
     */
    public static void main(String... args) {

        //AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
//
        //BookDao personDAO = context.getBean(BookDao.class);
        //System.out.println("List of person is:");
//
        //for (Book p : personDAO.findAll()) {
        //    System.out.println(p);
        //}
//
        //context.close();

        SpringApplication.run(Main.class, args);
    }

    /*## PostgreSQL
spring.datasource.url=jdbc:postgresql://localhost:5432/libraryonline
spring.datasource.username=postgres
spring.datasource.password=1qaZXsw2*/


}