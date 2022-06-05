import React, { useState } from "react";
import Papa from "papaparse";
import Button from "@mui/material/Button";
import { ERC721TokenType, ImmutableXClient, Link } from "@imtbl/imx-sdk";
import { TextField } from "@mui/material";
import "./styles.css";
// @ts-ignore
import NftTemplate from "../../assets/csv_templates/NftTransferTemplate.csv";
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

export default function BatchTransfer(props: ImxProps) {
  const [formValues, setFormValues] = useState<PostData>({
    title: "",
    body: "",
    file: null,
  });
  const [applyDone, setApplyDone] = useState(false);
  const [allNftData, setAllNftData] = useState([
    {
      type: ERC721TokenType.ERC721, // Must be of type ERC721
      tokenId: "", // the token ID
      tokenAddress: "", // the collection address / contract address this token belongs to
      toAddress: "", // the wallet address this token is being transferred to
    },
  ]);

  const addInput = () => {
    setApplyDone(false);
    const updateData = [
      ...allNftData,
      {
        type: ERC721TokenType.ERC721,
        tokenId: "",
        tokenAddress: "",
        toAddress: "",
      },
    ];

    // @ts-ignore
    setAllNftData(updateData);
  };

  const removeInput = () => {
    allNftData.pop();
    setApplyDone(false);
    setAllNftData([...allNftData]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApplyDone(false);
    let updateData = [...allNftData];

    for (let i = 0; i < updateData.length; i++) {
      if (event.target.name === "wallet") {
        if (event.target.id === "Wallet-ID" + i) {
          updateData[i].toAddress = event.target.value;
        }
      } else if (event.target.name === "token") {
        if (event.target.id === "Token-ID" + i) {
          updateData[i].tokenId = event.target.value;
        }
      } else if (event.target.name === "contract") {
        if (event.target.id === "Contract-ID" + i) {
          updateData[i].tokenAddress = event.target.value;
        }
      }
    }

    setAllNftData(updateData);
  };

  const addInputElements = allNftData.map(
    ({ tokenAddress, tokenId, toAddress }, key: number) => (
      <div className="InputNFT" key={key}>
        <TextField
          id={"Wallet-ID" + key}
          className="text-field"
          label="Wallet Address"
          onChange={handleChange}
          name="wallet"
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
                    color: "#23C6DD",
                  },
                  "& label.Mui-outlined": {
                    color: "#23C6DD",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&:hover fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#23C6DD",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "#23C6DD",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#23C6DD",
                  },
                }
          }
          variant="outlined"
        />

        <TextField
          id={"Token-ID" + key}
          label="Token ID"
          onChange={handleChange}
          variant="outlined"
          name="token"
          value={tokenId === "" ? "" : tokenId}
          sx={
            tokenId === ""
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
                    color: "#23C6DD",
                  },
                  "& label.Mui-outlined": {
                    color: "#23C6DD",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&:hover fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#23C6DD",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "#23C6DD",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#23C6DD",
                  },
                }
          }
        />

        <TextField
          id={"Contract-ID" + key}
          className="text-field"
          label="Token Address"
          onChange={handleChange}
          variant="outlined"
          name="contract"
          value={tokenAddress === "" ? "" : tokenAddress}
          sx={
            tokenAddress === ""
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
                    color: "#23C6DD",
                  },
                  "& label.Mui-outlined": {
                    color: "#23C6DD",
                  },

                  "& .MuiOutlinedInput-root": {
                    "& > fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&:hover fieldset": {
                      borderColor: "#23C6DD",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#23C6DD",
                    },
                  },
                  "& .MuiInputBase-root": {
                    color: "#23C6DD",
                  },
                  "& .MuiFormLabel-root": {
                    color: "#23C6DD",
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
            tokenId: d.tokenId,
            toAddress: d.toAddress,
            tokenAddress: d.tokenAddress,
            type: ERC721TokenType.ERC721,
          }));
          setApplyDone(false);

          if (
            allNftData[0].toAddress === "" &&
            allNftData[0].tokenAddress === "" &&
            allNftData[0].tokenId === ""
          ) {
            setAllNftData(data);
          } else {
            setAllNftData(allNftData.concat(data));
          }
        },
      });
    } catch (e) {
      console.log(`Error while loading .csv File:${e}`);
    }
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      file: event.target.files ? event.target.files[0] : null,
    }));
  };
  function apply() {
    setAllNftData(
      allNftData.filter(
        (element) =>
          element.toAddress !== "" ||
          element.tokenId !== "" ||
          element.tokenAddress !== ""
      )
    );

    setApplyDone(true);
  }
  function transferNft() {
    try {
      props.imxLink.transfer(allNftData);
    } catch (e) {
      alert("You have to connect to your wallet first!");
      console.log(`Error while transfer:${e}`);
    }
  }

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    let allInputsCorrect = true;
    for (let i = 0; i < allNftData.length; i++) {
      if (
        allNftData[i].toAddress === "" ||
        allNftData[i].tokenId === "" ||
        allNftData[i].tokenAddress === ""
      ) {
        alert("There is at least one missing input!");
        allInputsCorrect = false;
        setApplyDone(false);
        break;
      }
    }
    if (allInputsCorrect) {
      transferNft();
      setApplyDone(false);
    } else {
      setApplyDone(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <div className="Uploader">
        <div className="deposit-withdraw-section">
          <h1>NFT Selection:</h1>
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
                  color: "#23C6DD",
                },
                "& label.Mui-outlined": {
                  color: "#23C6DD",
                },

                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#23C6DD",
                  },
                  "&:hover fieldset": {
                    borderColor: "#23C6DD",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#23C6DD",
                  },
                },
                "& .MuiInputBase-root": {
                  color: "#23C6DD",
                },
                "& .MuiFormLabel-root": {
                  color: "#23C6DD",
                },
              }}
            />

            <Button
              size="large"
              variant="contained"
              component="label"
              sx={{ backgroundColor: "#23C6DD" }}
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
              href={NftTemplate}
              rel="noreferrer"
              download="NftTransferTemplate"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <Button
                size="large"
                variant="contained"
                component="label"
                sx={{ backgroundColor: "#23C6DD" }}
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
              sx={{ backgroundColor: "#23C6DD" }}
            >
              Add Item
            </Button>

            <Button
              size="large"
              variant="contained"
              component="label"
              onClick={removeInput}
              id="RemoveItem"
              sx={{ backgroundColor: "#23C6DD" }}
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
            sx={{ backgroundColor: "#23C6DD" }}
          >
            Apply
          </Button>

          {applyDone ? (
            <Button
              size="large"
              variant="contained"
              type="submit"
              id="Submit"
              sx={{ backgroundColor: "#23C6DD" }}
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
