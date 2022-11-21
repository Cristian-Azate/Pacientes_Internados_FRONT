import { Button, Card, CardContent, Typography ,Container, Grid } from "@mui/material";

export function Alert({message}) {
  return (
    <div>
         <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
         >
          <Grid item xs={3}>
            <Card
              sx={{
                mt: 3,     
                backgroundColor: "#fdd2dc;",
                padding: "1rem",              
                border: "solid #A52A2A 3px"  ,  
                borderRadius:"15px" 
              }}
            >
              <Typography variant="subtitle1" textAlign="center" color="red">
              {message}
              </Typography>
            </Card>
          </Grid>
       </Grid>
    </div>
  )
}
