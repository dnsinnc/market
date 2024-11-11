import ContentLoader from "react-content-loader"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileSkelet = (props: any) => (
   <ContentLoader
      speed={1}
      width={"100%"}
      height={'100%'}
      viewBox="0 0 1232 1500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
   >
      <rect x="100" y="300" rx="20" ry="20" width="80%" height="50%" />
   </ContentLoader>
)

export default ProfileSkelet
