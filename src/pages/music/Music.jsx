import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MusicGenreForm from "./MusicForm";
import api from "services/api/api";
import axios from "axios";
import { format } from "date-fns";

export default function Music() {
  const [musics, setMusics] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const handleDelete = (id) => {
    api
      .delete(`/music/${id}`)
      .then(() =>
        setMusics((musics) => musics.filter((item) => item.id !== id))
      );
  };

  const handleResult = (data, isNew) => {
    if (isNew) setMusics((musics) => [...musics, data]);
    else
      setMusics((musics) =>
        musics.map((item) => (item.id === data.id ? data : item))
      );
  };

  const columns = [
    { field: "name", headerName: "Nome", flex: 0.2 },
    { field: "author", headerName: "Autor", flex: 0.2 },
    { field: "genre", headerName: "Gênero", flex: 0.2 },
    {
      field: "release_date",
      headerName: "Data de lançamento",
      flex: 0.2,
      renderCell: (params) =>
        params.value ? format(new Date(params.value), "dd/MM/yyyy") : "",
    },
    {
      field: "id",
      headerName: "Ações",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="small"
              onClick={() => setItemToEdit(params.value)}
            >
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => handleDelete(params.value)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const source = axios.CancelToken.source();
    api
      .get("/music", {
        cancelToken: source.token,
      })
      .then(({ data }) => setMusics(data));

    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="mx-auto my-8 md:w-3/4">
      <MusicGenreForm
        itemToEdit={itemToEdit}
        handleResult={handleResult}
        setItemToEdit={setItemToEdit}
      />
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={musics} columns={columns} disableSelectionOnClick />
      </div>
    </div>
  );
}
