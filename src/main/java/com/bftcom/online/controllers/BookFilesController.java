package com.bftcom.online.controllers;

import com.bftcom.online.infrastructure.models.BookFile;
import com.bftcom.online.infrastructure.services.IBookFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class BookFilesController {
    @Autowired
    private IBookFileService service;

    /**
     * Получить список файлов.
     * @return Список файлов
     */
    @GetMapping("/files")
    public ResponseEntity<Iterable<BookFile>> getBookFiles() {
        try {

            List<BookFile> bookFiles = new ArrayList<BookFile>();

            service.findAll().forEach(bookFiles::add);

            if (bookFiles.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(bookFiles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Получить файл по идентификатору.
     * @param id Идентификатор файла
     * @return Файл
     */
    @GetMapping("/files/download/{id}")
    public ResponseEntity<byte[]> getBookFileById(@PathVariable("id") long id) {
        Optional<BookFile> _bookFile = service.findById(id);

        if (_bookFile.isPresent()) {

            BookFile bookFile = _bookFile.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + bookFile.getName() + "\"")
                    .contentType(MediaType.valueOf(bookFile.getType()))
                    .body(bookFile.getData());
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Удалить файл по идентификатору.
     * @param id Идентификатор
     * @return Статус
     */
    @DeleteMapping("/files/{id}")
    public ResponseEntity<HttpStatus> deleteBookFile(@PathVariable("id") long id) {
        try {
            service.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Загрузка файла
     * @param file
     * @param name
     * @param type
     * @param content_type
     * @return
     */
    @PostMapping("/files/upload")
    public ResponseEntity<Long> uploadFile(@RequestParam("file") MultipartFile file, String name, String type, int content_type) {

        try {
            BookFile bookFile = new BookFile();
            bookFile.setName(name);
            bookFile.setType(type);
            bookFile.setContentType(content_type);
            bookFile.setData(file.getBytes());

            BookFile result = service.save(bookFile);

            return new ResponseEntity<>(result.getId(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
