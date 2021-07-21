import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import api from "services/api/api";
import axios from "axios";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const validationSchema = yup.object({
  name: yup.string().required("Nome obrigatório"),
  genre: yup.string().required("Gênero musical obrigatório"),
  author: yup.string().required("Autor obrigatório"),
  release_date: yup.date("Selecione uma data valida"),
});

export default function MusicForm({ itemToEdit, setItemToEdit, handleResult }) {
  const formik = useFormik({
    initialValues: { name: "", genre: "", author: "", release_date: null },
    validationSchema: validationSchema,
    onSubmit: (values, helpers) => {
      let dataToSubmit = {
        name: values.name,
        genre: values.genre,
        author: values.author,
        release_date: values.release_date,
      };
      if (values.id)
        api.put(`/music/${values.id}`, dataToSubmit).then(({ data }) => {
          handleResult(data);
          helpers.resetForm();
        });
      else
        api.post("/music", dataToSubmit).then(({ data }) => {
          handleResult(data, true);
          helpers.resetForm();
        });
    },
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (itemToEdit) {
      api
        .get(`/music/${itemToEdit}`, {
          cancelToken: source.token,
        })
        .then(({ data }) => {
          setItemToEdit(null);
          formik.setValues(data);
        });
    }

    return () => {
      source.cancel();
    };
  }, [itemToEdit, formik, setItemToEdit]);

  return (
    <form onSubmit={formik.handleSubmit} className="mb-4">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Nome"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="genre"
            name="genre"
            label="Gênero"
            value={formik.values.genre}
            onChange={formik.handleChange}
            error={formik.touched.genre && Boolean(formik.errors.genre)}
            helperText={formik.touched.genre && formik.errors.genre}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="author"
            name="author"
            label="Autor"
            value={formik.values.author}
            onChange={formik.handleChange}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              fullWidth
              id="releaseDate"
              name="releaseDate"
              label="Data de lancamento"
              value={formik.values.release_date}
              onChange={(value) =>
                formik.handleChange({ target: { name: "release_date", value } })
              }
              format="dd/MM/yyyy"
              error={
                formik.touched.release_date &&
                Boolean(formik.errors.release_date)
              }
              helperText={
                formik.touched.release_date && formik.errors.release_date
              }
              inputVariant="outlined"
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Button color="primary" variant="contained" type="submit" size="small">
        Salvar
      </Button>
      <Button variant="contained" size="small" onClick={formik.handleReset}>
        Cancelar
      </Button>
    </form>
  );
}
