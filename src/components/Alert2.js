import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState,useContext } from "react";
import { pacientecontext } from "..//context/pacienteContext";
import { ingresocontext } from "../context/ingresoContext";
import { appacientecontext } from "../context/appacienteContext";
import { vacunapacientecontext } from "../context/vacunapacienteContext";
import { condicionpacientecontext } from "../context/condicionpacienteContext";
import { egresocontext } from "../context/egresoContext";

export function Alert2({ titulo, mensaje }) {
  const{alerta,setAlerta} = useContext(pacientecontext); 
  const{alertaingreso,setAlertaingreso} = useContext(ingresocontext); 
  const{alertaapppaciente,setalertaapppaciente} = useContext(appacientecontext); 
  const{alertavacunapaciente,setalertavacunapaciente} = useContext(vacunapacientecontext);
  const{alertacondicionpaciente, setalertacondicionpaciente} = useContext(condicionpacientecontext);
  const{alertaegreso,setalertaegreso} = useContext(egresocontext);

  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAlerta(false);
    setAlertaingreso(false);
    setalertaapppaciente(false);
    setalertavacunapaciente(false);
    setalertacondicionpaciente(false);
    setalertaegreso(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {titulo}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {mensaje}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
