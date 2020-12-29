INSERT INTO users (username, email, password)
VALUES 
('aaa', 'aaa@gmail.com', 'aaa'),
('bbb', 'bbb@gmail.com', 'bbb'),
('ccc', 'ccc@gmail.com', 'ccc');

INSERT INTO tags (user_id, tag)
VALUES 
(1, 'finals'),
(1, 'compass'),
(1, 'casual reads'),
(2, 'fantasy'),
(2, 'humour');

INSERT INTO categories (user_id, name, color)
VALUES 
(1, 'Lighthouse', 'ebcc34'),
(2, 'Composition', '34ebdc'),
(3, 'Music', '273491');

INSERT INTO entries (category_id)
VALUES
(1),
(2);

INSERT INTO entries (category_id, description, start_time, end_time,cumulative_pause_duration)
VALUES 
(1, 'final-planning', '2020-12-29 19:43:02+00', '2020-12-29 20:05:23+00', 200),
(1, 'compass-ruby', '2020-12-29 11:20:09+00', '2020-12-29 14:02:44+00', 900),
(2, 'brainstorming', '2020-12-29 13:20:09+00', '2020-12-29 14:02:44+00', 600),
(3, 'practice piano', '2020-12-29 11:20:09+00', '2020-12-29 12:02:44+00', 375);

INSERT INTO entries_tags (tag_id, entries_id)
VALUES 
(1, 3),
(2, 4),
(4, 5);

INSERT INTO audio_alerts (name, file_name)
VALUES 
('Short Break', 'short_break.mp3'),
('Back to work', 'back_to_work.mp3'),
('Long Break', 'long_break.mp3'),
('Long Break over', 'long_break_over.mp3');

INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break, shortbr_start_audio_alert_id, shortbr_end_audio_alert_id, longbr_start_audio_alert_id, longbr_end_audio_alert_id)
VALUES 
(1, 'Classic Pomodoro', 1500, 300, 4, 900, 1, 2, 3, 4),
(2, 'Classic Pomodoro', 1500, 300, 4, 900, 1, 2, 3, 4);

INSERT INTO timers (user_id, name, work, short_break, num_repeats, long_break)
VALUES 
(3, 'Classic Pomodoro', 1500, 300, 4, 900);
