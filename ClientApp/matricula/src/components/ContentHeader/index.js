import Typography from "components/Typography";




function ContentHeader({ title }) {
  return (
      <Typography
        style={{
          backgroundColor: "white",
          marginBottom: "15px",
          padding: "20px"
        }}
        align="left"

        variant="h3">
        {title} </Typography>
  )
}


export default ContentHeader;