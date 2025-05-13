import { Container, Typography, Grid, Link, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "background.paper", py: 6 }}
      className="mt-12 border-t"
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              PropertyFinder
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Find your dream property with ease. Browse thousands of listings
              and connect with top agents.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="inherit" sx={{ mr: 2 }}>
                <InstagramIcon />
              </Link>
              <Link href="#" color="inherit">
                <LinkedInIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <ul className="list-none p-0 m-0">
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Careers
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Contact Us
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Blog
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            <ul className="list-none p-0 m-0">
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Help Center
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Safety Center
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Community
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={6} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <ul className="list-none p-0 m-0">
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Terms of Service
                </Link>
              </li>
              <li className="mb-1">
                <Link href="#" color="inherit" underline="hover">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {"© "}
            <Link color="inherit" href="#">
              PropertyFinder
            </Link>{" "}
            {new Date().getFullYear()}
            {". All rights reserved."}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
