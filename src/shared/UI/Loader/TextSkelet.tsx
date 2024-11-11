import ContentLoader from "react-content-loader"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileSkelet = (props: any) => (
   <ContentLoader
      speed={1}
      width={"100%"}
      height={'100%'}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
   >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
   </ContentLoader>
)

export default ProfileSkelet
