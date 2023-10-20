INSERT INTO "categories" ("name") VALUES
    ('Task'),
    ('Random Thought'),
    ('Idea');


INSERT INTO "notes" ("name", "createdAt", "deletedAt", "category", "content", "isArchived") VALUES
    ('Name of note 1',TIMESTAMP '2023-08-01 12:34:56', NULL, 1, 'This is the content of note 1.', false),
    ('Name of note 2',TIMESTAMP '2023-08-02 09:45:23', NULL, 2, 'This is the content of note 2.', true),
    ('Name of note 3',TIMESTAMP '2023-08-03 15:27:19', NULL, 1, 'This is the content of note 3. 5/12/2022 10/10/2002 10/10/2009', false),
    ('Name of note 4',TIMESTAMP '2023-08-04 08:15:42', NULL, 3, 'This is the content of note 4.', true),
    ('Name of note 5',TIMESTAMP '2023-08-05 16:53:37', NULL, 1, 'This is the content of note 5.', false); 