import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import { TextField } from 'formik-material-ui';
import UnauthenticatedHeaderButtons from 'features/Header/UnauthenticatedHeaderButtons';
import { newCommentSuccess } from './agoraSlice';
import { selectMyId } from 'features/auth/authSlice';

export default function AgoraReplyComment({
  replyTo,
  setReplying = () => {},
}: {
  replyTo: string;
  setReplying?: (b: boolean) => void;
}) {
  const dispatch = useDispatch();
  const myId = useSelector(selectMyId);
  if (myId === null)
    return (
      <Alert severity="info" variant="outlined">
        <AlertTitle>Express yourself!</AlertTitle>
        <Box flexGrow={1}>You need to be logged in to make a comment.</Box>
        <Box>
          <UnauthenticatedHeaderButtons />
        </Box>
      </Alert>
    );
  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, setValues }) => {
        Axios.post('/api/agora/agorize/comment', {
          body: values.body,
          replyTo,
          type: 'COMMENT',
        }).then((res) => {
          dispatch(
            newCommentSuccess({
              ...res.data.agoragram,
              ...values,
              author: myId,
              children: [],
              replyTo,
              stars: 0,
              type: 'COMMENT',
            }),
          );
          setValues({
            body: '',
          });
          setSubmitting(false);
          setReplying(false);
        });
      }}
      validationSchema={Yup.object({
        body: Yup.string().required().max(10000),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            fullWidth
            label="Body"
            margin="normal"
            multiline
            name="body"
            rows={4}
            variant="outlined"
          />
          <Button color="primary" disabled={isSubmitting} disableElevation type="submit" variant="contained">
            Publish
          </Button>
        </Form>
      )}
    </Formik>
  );
}
