import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import Webcam from "react-webcam";
import { Button } from "semantic-ui-react";

import { Modal } from "../../components";

import { uploadPhoto } from "../../store/ducks/account/services";

import { ApplicationState } from "../../models";

const MyAvatar: FC = () => {
  const account = useSelector((state: ApplicationState) => state.account.data);

  const [webcam, setWebcam] = useState<Webcam | null>(null);
  const [showPictureModal, setPictureModal] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  const capture = () => {
    if (!webcam) return;
    setImageSrc(webcam.getScreenshot());
  };

  const publishPhoto = () => {
    if (!account.id) return;

    uploadPhoto(account.id, imageSrc).catch(err => {
      setPictureModal(false);
      console.log(err);
    });
  };

  const inputPhoto = (files: any) => {
    if (files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = () => {
        setImageSrc(reader.result);
        setPictureModal(true);
      };
    }
  };

  const renderFooter = () => {
    return (
      <div className="modal-footer text-center">
        <div className="col-group">
          <div className="col-12">
            {imageSrc ? (
              <img alt="avatar" className="webcam" src={imageSrc} />
            ) : (
              <Webcam
                audio={false}
                height={300}
                ref={ref => setWebcam(ref)}
                screenshotFormat="image/jpeg"
                width={380}
                screenshotQuality={1}
                className="webcam"
              />
            )}
            <div className="grid-container">
              <div className="">
                <Button
                  onClick={() => {
                    setPictureModal(false);
                    setImageSrc(null);
                  }}
                  className="btn btn-outilne"
                >
                  No, cancel!
                </Button>
              </div>
              <div className="">
                {imageSrc ? (
                  <>
                    <Button onClick={() => setImageSrc(null)} className="btn">
                      Take another photo
                    </Button>

                    <Button
                      onClick={() => {
                        setPictureModal(false);
                        publishPhoto();
                      }}
                      className="btn"
                    >
                      Confirm photo!
                    </Button>
                  </>
                ) : (
                  <Button onClick={capture} className="btn">
                    Capture photo
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="password-content">
        <h4>Picture</h4>
        <div className="col-4">
          <p>Take or choose a picture for your profile!</p>
        </div>
        <hr />
        <div className="text-right">
          <Button className="btn" onClick={() => setPictureModal(true)}>
            Take a photo
          </Button>
          <label className="input-photo">
            <input
              style={{ display: "none" }}
              onChange={e => {
                inputPhoto(e.target.files);
              }}
              type="file"
            />
            Select a file
          </label>
        </div>
      </div>
      {showPictureModal && (
        <Modal
          title={`Take a Picture`}
          close={() => true}
          renderFooter={renderFooter}
        />
      )}
    </>
  );
};

export default MyAvatar;
