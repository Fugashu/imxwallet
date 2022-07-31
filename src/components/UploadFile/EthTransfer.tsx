import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ETHTokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
import Papa from "papaparse";
// @ts-ignore
import EthTemplate from "../../assets/csv_templates/EthereumTransferTemplate.csv";

interface PostData {
  title: string;
  body: string;
  file: File | null;
}

interface ImxProps {
  walletAddress: string;
  apiClient: ImmutableXClient;
  imxLink: Link;
}

export default function EthTransfer(props: ImxProps) {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });
  const [applyDone, setApplyDone] = useState(false);
  const [EthTransferData, setEthTransferData] = useState([
    {
      type: ETHTokenType.ETH,
      amount: "",
      toAddress: "",
    },
  ]);
  const addInput = () => {
    setApplyDone(false);
    const updateDate = [
      ...EthTransferData,
      { type: ETHTokenType.ETH, amount: "", toAddress: "" },
    ];
    setEthTransferData(updateDate);
  };

  const removeInput = () => {
    EthTransferData.pop();
    setApplyDone(false);
    setEthTransferData([...EthTransferData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyDone(false);
    let updateData = [...EthTransferData];
    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + i) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "Ethereum") {
        if (event.target.id === "Ethereum-ID" + i) {
          updateData[i].amount = event.target.value;
        }
      }
    }

    setEthTransferData(updateData);
  };

  const addInputElements = EthTransferData.map(
    ({ amount, toAddress }, key: number) => (
      <div className="InputETH" key={key}>
        <TextField
          className="text-field"
          id={"Wallet-ID" + key}
          label="Wallet Address"
          onChange={handleChange}
          name="wallet"
          variant="outlined"
          value={toAddress === "" ? "" : toAddress}
          sx={
            toAddress === ""
              ? {
                  "& label.Mui-focused": {
                    color: "red",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "red",
                    },
                    "&:hover fieldset": {
                      borderColor: "red",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "red",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "red",
                  },
                  "& .MuiFormLabel-root": {
                    color: "red",
                  },
                }
              : {
                  "& label.Mui-focused": {
                    color: "#0072F5",
                  },
                  "& label.Mui-outlined": {
                    color: "#0072F5",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#0072F5",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0072F5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0072F5",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "#0072F5",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#0072F5",
                  },
                }
          }
        />

        <TextField
          id={"Ethereum-ID" + key}
          label="Amount(ETH)"
          onChange={handleChange}
          variant="outlined"
          name="Ethereum"
          value={amount === "" ? "" : amount}
          sx={
            amount === ""
              ? {
                  "& label.Mui-focused": {
                    color: "red",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "red",
                    },
                    "&:hover fieldset": {
                      borderColor: "red",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "red",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "red",
                  },
                  "& .MuiFormLabel-root": {
                    color: "red",
                  },
                }
              : {
                  "& label.Mui-focused": {
                    color: "#0072F5",
                  },
                  "& label.Mui-outlined": {
                    color: "#0072F5",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#0072F5",
                    },
                    "&:hover fieldset": {
                      borderColor: "#0072F5",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#0072F5",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "#0072F5",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#0072F5",
                  },
                }
          }
        />
      </div>
    )
  );
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      // @ts-ignore
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // @ts-ignore
          let data = results.data.map((d: any) => ({
            toAddress: d.toAddress,
            amount: d.amount,
            type: ETHTokenType.ETH,
          }));
          setApplyDone(false);
          // @ts-ignore
          if (
            EthTransferData[0].amount === "" &&
            EthTransferData[0].toAddress === ""
          ) {
            setEthTransferData(data);
          } else {
            setEthTransferData(EthTransferData.concat(data));
          }
        },
      });
    } catch (e) {
      console.log(`Error while depositing ETH:${e}`);
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };
  function apply() {
    setEthTransferData(
      EthTransferData.filter(
        (element) => element.toAddress !== "" || element.amount !== ""
      )
    );

    setApplyDone(true);
  }

  function transferEth() {
    try {
      props.imxLink.transfer(EthTransferData);
    } catch (e) {
      alert("You have to connect to your wallet first!");
      console.log(`Error while depositing ETH:${e}`);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    let allInputsCorrect = true;
    for (let i = 0; i < EthTransferData.length; i++) {
      if (
        EthTransferData[i].toAddress === "" ||
        EthTransferData[i].amount === ""
      ) {
        alert("There is at least one missing input!");
        allInputsCorrect = false;
        setApplyDone(false);
        break;
      }
    }
    if (allInputsCorrect) {
      transferEth();
      setApplyDone(false);
    } else {
      setApplyDone(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className="Uploader">
        <div className="deposit-withdraw-section">
          <h1>Ethereum Selection:</h1>
          <div className="deposit-withdraw-group">
            <TextField
              className="text-field"
              id="outlined-basic"
              label="Selected File: "
              variant="outlined"
              inputProps={{ readOnly: true }}
              value={formValues.file?.name ?? "No File selected.."}
              sx={{
                "& label.Mui-focused": {
                  color: "#0072F5",
                },
                "& label.Mui-outlined": {
                  color: "#0072F5",
                },

                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#0072F5",
                  },
                  "&:hover fieldset": {
                    borderColor: "#0072F5",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#0072F5",
                  },
                },
                "& .MuiInputBase-root": {
                  color: "#0072F5",
                },
                "& .MuiFormLabel-root": {
                  color: "#0072F5",
                },
              }}
            />

            <Button
              size="large"
              variant="contained"
              component="label"
              sx={{ backgroundColor: "#0072F5" }}
            >
              Upload File
              <input
                type="file"
                onChange={handleFileChange}
                accept=".csv"
                hidden
              />
            </Button>
            <a
              href={EthTemplate}
              rel="noreferrer"
              download="EthereumTransferTemplate"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button
                size="large"
                variant="contained"
                component="label"
                sx={{ backgroundColor: "#0072F5" }}
              >
                Get Template
              </Button>
            </a>
          </div>
          <div className="NFT-Items">
            {addInputElements}

            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={addInput}
              id="AddItem"
              sx={{ backgroundColor: "#0072F5" }}
            >
              Add Item
            </Button>

            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={removeInput}
              id="RemoveItem"
              sx={{ backgroundColor: "#0072F5" }}
            >
              Remove Item
            </Button>
          </div>
          <Button
            size="large"
            variant="contained"
            component="label"
            onClick={apply}
            id="Apply"
            sx={{ backgroundColor: "#0072F5" }}
          >
            Apply
          </Button>

          {applyDone ? (
            <Button
              size="large"
              variant="contained"
              type="submit"
              id="Submit"
              sx={{ backgroundColor: "#0072F5" }}
            >
              Submit
            </Button>
          ) : (
            <Button
              size="large"
              variant="contained"
              type="button"
              id="Submit"
              disabled={true}
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
