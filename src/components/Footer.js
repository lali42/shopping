import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Grid, IconButton } from "@material-ui/core";

export const Footer = () => {
  return (
    <div className="bg-footer">
      <Grid container spacing={3}>
        <Grid item xs>
          <div>
            <p className="title-footer">Find us</p>
            <p style={{ color: "black" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </p>
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <p className="title-footer">Quick links</p>
            <ul>
              <a href="#" className="a-footer">
                Image Rectoucing
              </a>
              <br />
              <a href="#" className="a-footer">
                Clipping Path
              </a>
              <br />
              <a href="#" className="a-footer">
                Hollow Man Montage
              </a>
              <br />
              <a href="#" className="a-footer">
                Ebay | Amazon
              </a>
              <br />
              <a href="#" className="a-footer">
                Hair Masking/Clipping
              </a>
              <br />
              <a href="#" className="a-footer">
                Image Cropping
              </a>
            </ul>
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <p className="title-footer">Quick links</p>
            <ul>
              <a href="#" className="a-footer">
                Remove Background
              </a>
              <br />
              <a href="#" className="a-footer">
                Shadows | Mirror Reflection
              </a>
              <br />
              <a href="#" className="a-footer">
                Logo Design
              </a>
              <br />
              <a href="#" className="a-footer">
                Vectorization
              </a>
              <br />
              <a href="#" className="a-footer">
                Hair Masking/Clipping
              </a>
              <br />
              <a href="#" className="a-footer">
                Image Cropping
              </a>
            </ul>
          </div>
        </Grid>
        <Grid item xs>
          <div>
            <p className="title-footer">Careers</p>
            <ul>
              <a href="#" className="a-footer">
                Job openings
              </a>
              <br />
              <a href="#" className="a-footer">
                Employee success
              </a>
              <br />
              <a href="#" className="a-footer">
                Benefits
              </a>
              <br />
            </ul>
          </div>
        </Grid>

        <Grid xs={12}>
          <hr />
          <div className="center">
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <YouTubeIcon />
            </IconButton>
          </div>
          <div className="center">Lali © 1999</div>
        </Grid>
      </Grid>
    </div>
  );
};
