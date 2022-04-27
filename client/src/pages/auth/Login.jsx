import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { Card, Text, Input, Spacer, Button, Row, Loading } from '@nextui-org/react'
import { login } from '../../redux/actions/authActions';
import { useForm, Controller } from "react-hook-form";
import { EMAIL_REGEX } from '../../utils/validate';

function Login() {
  const dispatch = useDispatch()
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const onSubmit = (user) => {
    dispatch(login(user))
    reset({
      email: "",
      password: ""
    })
  };

  const { loading } = useSelector(state => state.auth);
  return (
    <>
      <div className="container center">
        <Card css={{ mw: "450px" }}>
          <Text h3 css={{ ta: "center" }}>Login</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button type="submit" css={{ w: "100%" }}>Login</Button>
          </form>
          <Spacer y={1} />
          <Row justify="center">
            <Text css={{ mr: "6px" }}>Are you have an account?</Text>
            <Link className="link-register" to="/register">Register</Link>
          </Row>
        </Card>
        {loading ?
          <div className="loading">
            <Loading color="white" size="lg" />
          </div>
          : null}
      </div>

    </>
  )
}

export default Login