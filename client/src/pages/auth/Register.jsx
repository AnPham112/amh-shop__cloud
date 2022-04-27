import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Input, Spacer, Button, Row, Loading } from '@nextui-org/react'
import { register } from '../../redux/actions/authActions';
import { useForm, Controller } from "react-hook-form";
import { EMAIL_REGEX } from '../../utils/validate';

function Register() {
  const dispatch = useDispatch()
  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cfPassword: ""
    }
  });

  const pwd = watch("password")

  const onSubmit = (user) => {
    dispatch(register(user))
    reset({
      name: "",
      email: "",
      password: "",
      cfPassword: ""
    })
  };

  const { loading } = useSelector(state => state.auth);

  return (
    <div className="container center">
      <Card css={{ mw: "450px" }}>
        <Text h3 css={{ ta: "center" }}>Register</Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Spacer y={1} />
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
              <Input
                clearable
                css={{ w: "100%" }}
                rounded
                bordered
                label="Name"
                placeholder="Name..."
                color="default"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                helperColor="error"
                helperText={error?.message}
              />
            }
          />
          <Spacer y={1} />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_REGEX, message: "Email is invalid" }
            }}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
              <Input
                clearable
                css={{ w: "100%" }}
                rounded
                bordered
                label="Email"
                placeholder="Email..."
                color="default"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                helperColor="error"
                helperText={error?.message}
              />
            }
          />

          <Spacer y={1} />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" }
            }}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
              <Input.Password
                clearable
                css={{ w: "100%" }}
                rounded
                bordered
                label="Password"
                placeholder="Password..."
                color="default"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                helperColor="error"
                helperText={error?.message}
              />
            }
          />
          <Spacer y={1} />
          <Controller
            name="cfPassword"
            control={control}
            rules={{
              required: "Confirm password is required",
              validate: value => value === pwd || "Password do not match"
            }}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>
              <Input.Password
                clearable
                css={{ w: "100%" }}
                rounded
                bordered
                label="Confirm password"
                placeholder="Confirm password..."
                color="default"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                helperColor="error"
                helperText={error?.message}
              />
            }
          />
          <Spacer y={1} />
          <Button type="submit" css={{ w: "100%" }}>Register</Button>
        </form>
        <Spacer y={1} />
        <Row justify="center">
          <Text css={{ mr: "6px" }}>You already have an account?</Text>
          <Link className="link-login" to="/login">Login</Link>
        </Row>
      </Card>
      {loading ?
        <div className="loading">
          <Loading color="white" size="lg" />
        </div>
        : null}
    </div>
  )
}

export default Register