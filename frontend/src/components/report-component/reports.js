import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "auto",
    marginTop: "20px",
    padding: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    // flexBasis: '33.33%',
    flexShrink: 0,
    margin: "auto",
    
    // backgroundColor: theme.palette.primary.main,
  },
  // secondaryHeading: {
  //   fontSize: theme.typography.pxToRem(15),
  //   color: theme.palette.text.primary,
  //   alignItems: 'center',
  // },
  btnGroup: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2),
    },
    paddingLeft: 10,
    margin: "auto",
  },
  text: {
    margin: theme.spacing(2),
    width: "100%",
  },
  // expandedPanel: {
  //   color: "#ffffff",
  // },
  panel: {
    backgroundColor: theme.palette.secondary.main,
    color: "#ffffff",
  },
  icn: {
    color: "#ffffff",
  },
  repo: {
    display: "flex",
  },
  sub: {
    width: "100%",
  },
  accord: {
    width:"600px",
    paddingTop: "20px"
  },
  cont: {
    paddingLeft: "50px",
    backgroundColor: 'rgba(1, 1, 74, 0.2)',
  },
  csv: {
    paddingLeft: "100px"
  }
}));

const Reports = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [fineDetails, setFineDetails] = useState([]);
  const [returnDate, setReturnDate] = useState(null);
  const [filteredDateData, setFilteredDateData] = useState([]);
////////////////////
const [bookDetails, setBookDetails] = useState([]);
  const [author, setAuthor] = useState(null);
  const [filteredAuthorData, setFilteredAuthorData] = useState([]);
  useEffect(() => {
    retrieveFineDetails();
  }, []);

  useEffect(() => {
    retrieveBookDetails();
  }, []);


  const retrieveFineDetails = () => {
    setFineDetails([]);
    axios.get(`${API_URL}/api/fine/getFineDetails`).then((res) => {
      console.log(res.data);
      res.data.forEach((item) => {
        let object = {
          MemberCode: item.memberCode,
          BorrowDate: item.borrowDate,
          ReturnDate: item.returnDate,
          Amount: item.fine,
        };
        fineDetails.push(object);
      });
      setFineDetails(fineDetails);
    });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleReturnDate = (e) => {
    setReturnDate(e.target.value);
  };

  const generateDateReport = () => {
    console.log(fineDetails);
    var filteredData = fineDetails.filter(function (obj) {
      return obj.ReturnDate <= returnDate;
    });
    setFilteredDateData(filteredData);
  };

  ////////////////////////////////////////////////////////

  const retrieveBookDetails = () => {
    setBookDetails([]);
    axios.get(`${API_URL}/BookDetails/getAllBooks`).then((res) => {
      console.log(res.data);
      res.data.forEach((item) => {
        let object = {
          Title: item.title,
          Author: item.author,
          Publisher: item.publisher,
          RefCode: item.refCode,
          NoOfCopies: item.noOfCopies,
        };
        bookDetails.push(object);
      });
      setBookDetails(bookDetails);
    });
  };

  const handleAuthor = (e) => {
    setAuthor(e.target.value);
  };

  const generateBookReport = () => {
    console.log(bookDetails);
    var filteredbookData = bookDetails.filter(function (objt) {
      return objt.Author <= author;
      
    });
    setFilteredAuthorData(filteredbookData);
  };

  return (
    <div>
      <h1 id="h12" align="center">
        Generate reports
      </h1>

      <div className={classes.root}>
        <Accordion
          className={classes.accord}
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          marginTop="10px"
        >
          <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon className={classes.icn}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ expanded: classes.expandedPanel }}
          >
            <AssignmentIcon/>

            <Typography className={classes.heading}>Book Reports</Typography>
            {/* <Typography className={classes.secondaryHeading}>Book Reports</Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.cont}>
            <Typography>
              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    type="author"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Repoauthor"
                    label="Book Author"
                    name="Repoauthor"
                    autoComplete="Repoauthor"
                    // InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleAuthor(e)}
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => generateBookReport()}
                    >
                      Filter
                    </Button>
                  </div>
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                  <CSVLink
                      filename={"BookDetails.csv"}
                      data={filteredAuthorData}
                      className="btn btn-primary m-2"
                      data-toggle="tooltip"
                      data-placement="top"
                    >
                      GENERATE
                    </CSVLink>
                  </div>
                </Grid>
              </Grid>

              {/* <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="RepoType"
                    label="Book Type"
                    name="RepoType"
                    autoComplete="RepoType"
                    autoFocus
                  />
                </Grid> */}

                {/* <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid> */}
              {/* </Grid> */}
              <div className={classes.btnGroup}>
              <CSVLink
                  className={classes.csv}
                  filename={"BookDetails.csv"}
                  data={bookDetails}
                  className="btn btn-primary m-2"
                  data-toggle="tooltip"
                  data-placement="top"
                >
                  Generate All Book Details Report
                </CSVLink>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        className={classes.accord}
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          marginTop="10px"
        >
          <AccordionSummary
          className={classes.panel}
            expandIcon={<ExpandMoreIcon className={classes.icn}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ expanded: classes.expandedPanel }}
          >
            <AssignmentIcon />

            <Typography className={classes.heading}>Staff Reports</Typography>
            {/* <Typography className={classes.secondaryHeading}>Book Reports</Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.cont}>
            <Typography>
              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Repoauthor"
                    label="Book Author"
                    name="Repoauthor"
                    autoComplete="Repoauthor"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="RepoType"
                    label="Book Type"
                    name="RepoType"
                    autoComplete="RepoType"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <div className={classes.btnGroup}>
                <Button
                  id="btnAllReport"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Generate All Book Details Report
                </Button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        className={classes.accord}
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon className={classes.icn}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ expanded: classes.expandedPanel }}
          >
            <AssignmentIcon />

            <Typography className={classes.heading}>Borrow Reports</Typography>
            {/* <Typography className={classes.secondaryHeading}>Book Reports</Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.cont}>
            <Typography>
              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Repoauthor"
                    label="Book Author"
                    name="Repoauthor"
                    autoComplete="Repoauthor"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="RepoType"
                    label="Book Type"
                    name="RepoType"
                    autoComplete="RepoType"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <div className={classes.btnGroup}>
                <Button
                  id="btnAllReport"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Generate All Book Details Report
                </Button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        className={classes.accord}
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon className={classes.icn}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ expanded: classes.expandedPanel }}
          >
            <AssignmentIcon />

            <Typography className={classes.heading}>Member Reports</Typography>
            {/* <Typography className={classes.secondaryHeading}>Book Reports</Typography> */}
          </AccordionSummary>
          <AccordionDetails className={classes.cont}>
            <Typography>
              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="Repoauthor"
                    label="Book Author"
                    name="Repoauthor"
                    autoComplete="Repoauthor"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <TextField
                    className={classes.text}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="RepoType"
                    label="Book Type"
                    name="RepoType"
                    autoComplete="RepoType"
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Generate
                    </Button>
                  </div>
                </Grid>
              </Grid>
              <div className={classes.btnGroup}>
                <Button
                  id="btnAllReport"
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Generate All Book Details Report
                </Button>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
        className={classes.accord}
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            className={classes.panel}
            expandIcon={<ExpandMoreIcon className={classes.icn}/>}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            classes={{ expanded: classes.expandedPanel }}
          >
            <AssignmentIcon />

            <Typography className={classes.heading}>
              Fine List Reports
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.cont}>
            <Typography>
              <Grid container>
                <Grid item>
                  <TextField
                    variant="outlined"
                    type="date"
                    margin="normal"
                    fullWidth
                    id="borrowDate"
                    label="Return Date"
                    name="borrowDate"
                    autoComplete="borrowDate"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleReturnDate(e)}
                    autoFocus
                  />
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <Button
                      id="btnReport"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => generateDateReport()}
                    >
                      Filter
                    </Button>
                  </div>
                </Grid>

                <Grid item alignItems="stretch" style={{ display: "flex" }}>
                  <div className={classes.btnGroup}>
                    <CSVLink
                      filename={"FinesDetails.csv"}
                      data={filteredDateData}
                      className="btn btn-primary m-2"
                      data-toggle="tooltip"
                      data-placement="top"
                    >
                      GENERATE
                    </CSVLink>
                  </div>
                </Grid>
              </Grid>
              <div className={classes.btnGroup}>
                <CSVLink
                  filename={"FinesDetails.csv"}
                  data={fineDetails}
                  className="btn btn-primary m-2"
                  data-toggle="tooltip"
                  data-placement="top"
                >
                  Generate All Fine Details Report
                </CSVLink>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Reports;