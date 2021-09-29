import { MDBContainer, MDBFooter } from "mdbreact";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#292929",
    color: "#ffffff",
    bottom: "0px",
    padding: "10px",
    position: "fixed",
    marginTop: "100px",
    width: "100%",
  },
}));

const FooterPage = () => {
  const classes = useStyles();

  return (
    <MDBFooter color="blue" className="font-small pt-4 mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid className={classes.footer}>
          &copy; {new Date().getFullYear()} Copyright @ LMS system
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
