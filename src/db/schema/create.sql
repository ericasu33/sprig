DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS entries CASCADE;
DROP TABLE IF EXISTS entries_tags CASCADE;
DROP TABLE IF EXISTS audio_alerts CASCADE;
DROP TABLE IF EXISTS timers CASCADE;

-- time durations (INTEGER) are all in seconds
-- percentage are all in decimals where 0 = 0% , 1  = 100%.

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY NOT NULL,
  tag VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL UNIQUE,
  color VARCHAR(255) NOT NULL
);

-- https://stackoverflow.com/questions/2762302/appropriate-datatype-for-holding-percent-values
-- https://www.postgresqltutorial.com/postgresql-timestamp/
-- https://www.postgresqltutorial.com/postgresql-to_timestamp/
-- https://stackoverflow.com/questions/22332425/default-timestamp-format-and-fractional-seconds
-- https://www.postgresqltutorial.com/postgresql-current_timestamp/

CREATE TABLE entries (
  id SERIAL PRIMARY KEY NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  description VARCHAR(255),
  -- date DATE NOT NULL DEFAULT CURRENT_DATE,
  start_time timestamptz DEFAULT CURRENT_TIMESTAMP(0) NOT NULL,
  end_time timestamptz DEFAULT CURRENT_TIMESTAMP(0),
  cumulative_pause_duration INTEGER DEFAULT 0 NOT NULL,
  intensity DECIMAL(3,2) CONSTRAINT chk_intensity CHECK (intensity between 0 and 1) DEFAULT 1 NOT NULL
);

-- https://www.postgresqltutorial.com/postgresql-time/

CREATE TABLE entries_tags (
  id SERIAL PRIMARY KEY NOT NULL,
  tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
  entries_id INTEGER REFERENCES entries(id) ON DELETE CASCADE
);

CREATE TABLE audio_alerts (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL
);

CREATE TABLE timers (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  work INTEGER DEFAULT 0 NOT NULL,
  short_break INTEGER DEFAULT 0 NOT NULL,
  num_repeats INTEGER DEFAULT 0 NOT NULL,
  long_break INTEGER DEFAULT 0 NOT NULL,
  shortbr_start_audio_alert_id INTEGER REFERENCES audio_alerts(id) ON DELETE CASCADE,
  shortbr_end_audio_alert_id INTEGER REFERENCES audio_alerts(id) ON DELETE CASCADE,
  longbr_start_audio_alert_id INTEGER REFERENCES audio_alerts(id) ON DELETE CASCADE, 
  longbr_end_audio_alert_id INTEGER REFERENCES audio_alerts(id) ON DELETE CASCADE,
  notifications BOOLEAN DEFAULT TRUE NOT NULL,
  global_alert_volume DECIMAL(3,2) DEFAULT 0.5 NOT NULL,
  shortbr_start_alert_volume DECIMAL(3,2) DEFAULT 0.5 NOT NULL,
  shortbr_end_alert_volume DECIMAL(3,2) DEFAULT 0.5 NOT NULL,
  longbr_start_alert_volume DECIMAL(3,2) DEFAULT 0.5 NOT NULL,
  longbr_end_alert_volume DECIMAL(3,2) DEFAULT 0.5 NOT NULL,
  is_default_timer BOOLEAN DEFAULT FALSE NOT NULL,
  is_auto_starting BOOLEAN DEFAULT TRUE NOT NULL,
  pause_task_on_breaks BOOLEAN DEFAULT TRUE NOT NULL,
  visual_notifications BOOLEAN DEFAULT TRUE NOT NULL,
  CONSTRAINT chk_volume CHECK (
    global_alert_volume between 0 and 1
    AND shortbr_start_alert_volume between 0 and 1
    AND shortbr_end_alert_volume between 0 and 1
    AND longbr_start_alert_volume between 0 and 1
    AND longbr_end_alert_volume between 0 and 1
  )
);

