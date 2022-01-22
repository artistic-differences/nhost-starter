CREATE TABLE "public"."user_profile" ("id" bigserial NOT NULL, "email" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "firstname" Text NOT NULL, "lastname" Text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("email"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_user_profile_updated_at"
BEFORE UPDATE ON "public"."user_profile"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_user_profile_updated_at" ON "public"."user_profile" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
