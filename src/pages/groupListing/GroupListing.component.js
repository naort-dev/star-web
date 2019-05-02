import React from 'react';
import { PageWrapper, PageContainer, CoverBoxWrapper, BoxListing, BoxListingCover, TopCoverBox, StyledPlayButton, BottomCoverBox, SecondaryHeading, StyledTitlePricingBox, InfoHeader, StyledCardInfo, CoverWrap, LoaderWrapper } from './styled';
import Header from '../../components/Header';
import StarListing from '../../components/StarListing';
// import ScrollList from '../../components/ScrollList';
import { Footer } from '../../components/Footer';
import Loader from '../../components/Loader';

export default class GroupListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.groupID = this.props.match.params.id.toLowerCase();
  }

  componentDidMount() {
    this.props.fetchGroupDetails(this.groupID);
    this.props.fetchMemberList(this.groupID, 0, true);
  }

  profileClicked = (user_id) => {
    this.props.history.push(user_id);
  }

  renderMembers = member => {
    const profileImg = (member.avatar_photo&&member.avatar_photo.image_url)?member.avatar_photo.image_url:"../../assets/images/profile.png";
    return (
    <BoxListing key={member.user_id}>
      <BoxListingCover onClick={() => this.profileClicked(member.user_id)}>
        <TopCoverBox bgImage={profileImg}>
          <StyledPlayButton />
        </TopCoverBox>
        <BottomCoverBox>
          <SecondaryHeading>{member.celebrity_profession[0].title}</SecondaryHeading>
          <StyledTitlePricingBox title={member.get_short_name} pricing={"$"+member.rate} />
        </BottomCoverBox>
      </BoxListingCover>
    </BoxListing>)
  }

  fetchList = (groupID, offset = 0, refresh = true) => {
    this.props.fetchMemberList(groupID, offset, refresh);
  }

  render() {
    const {
      membersList, membersLimit, membersCount, membersOffset, membersLoading, groupDetails
    } = this.props;
    let group_image = (groupDetails.avatar_photo&&groupDetails.avatar_photo.image_url)?groupDetails.avatar_photo.image_url:'assets/images/default-cover.jpg';
    let group_description = (groupDetails.group_details&&groupDetails.group_details.description)?groupDetails.group_details.description:'';
    let group_website = (groupDetails.group_details&&groupDetails.group_details.website)?groupDetails.group_details.website:'';
    return (
      <PageWrapper>
        <Header />

        <PageContainer>
          <CoverWrap>
            <InfoHeader>
              <img src={group_image} />
              <StyledCardInfo Infotext={group_description} InfoHeading={group_website} />
            </InfoHeader>
          </CoverWrap>
          <CoverBoxWrapper>
            <StarListing
              customLoader
              dataList={membersList}
              loading={membersLoading}
              offset={membersOffset}
              noDataText="No members"
              fetchData={(offset, refresh) => this.fetchList(this.groupID, offset, refresh)}
              totalCount={membersCount}
              limit={membersLimit}
            />
          </CoverBoxWrapper>          
        </PageContainer>
        <Footer />
      </PageWrapper>
    );
  }
}
