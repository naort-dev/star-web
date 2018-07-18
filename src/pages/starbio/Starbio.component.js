import React from 'react'
import axios from 'axios'
import { LoginContainer, HeaderSection, FooterSection } from './styled'
import { Scrollbars } from 'react-custom-scrollbars';
import { fetch } from '../../services/fetch'
import Api from '../../lib/api';
import { Link } from 'react-router-dom'

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}


// handleChange = (info) => {
//   if (info.file.status === 'uploading') {
//     this.setState({ loading: true });
//     return;
//   }
//   if (info.file.status === 'done') {
//     // Get this url from response in real world.
//     getBase64(info.file.originFileObj, imageUrl => this.setState({
//       imageUrl,
//       loading: false,
//     }));
//   }
// }

// function beforeUpload(file) {
//   const isJPG = file.type === 'image/jpeg';
//   if (!isJPG) {
//     message.error('You can only upload JPG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJPG && isLt2M;
// }

export default class Starbio extends React.Component {
    constructor(props) {
        super(props)
        this.state = { featuredImage: null, firstImage: null, secondImage: null, image: [] }
    }


    beforeUpload(file) {
        this.setState({ file: file })
    }

    onFileChange(type="featuredImage") {
        console.log("type is", type)
        var file = document.getElementById(type).files[0];
        console.log("file is", file)
        var reader = new FileReader();
    
        // listen for 'load' events on the FileReader
        reader.addEventListener("load", function () {
          // change the preview's src to be the "result" of reading the uploaded file (below)
          console.log("result", reader.result)
          this.setState({ [type]: reader.result, [`${type}File`]: file })
        }.bind(this), false);
    
        // if there's a file, tell the reader to read the data
        // which triggers the load event above
        if (file) {
          reader.readAsDataURL(file);
        }
    
      }
    




    uploadImage(type) {
        fetch(Api.getImageCredentials, {
            'headers': { 'Authorization': `token ${this.props.session.auth_token.authentication_token}` }
        })
            .then(response => {
                let images = this.state.image
                let filename = response.data.data.fields.key.split('/')
                filename = filename[2]
                const formData = new FormData()
                formData.append('success_action_status', response.data.data.fields.success_action_status);
                formData.append('signature', response.data.data.fields.signature)
                formData.append('x-amz-security-token', response.data.data.fields["x-amz-security-token"]);
                formData.append('acl', response.data.data.fields.acl);
                formData.append('Access-Control-Allow-Origin', response.data.data.fields["Access-Control-Allow-Origin"]);
                formData.append('policy', response.data.data.fields.policy);
                formData.append('key', response.data.data.fields.key);
                formData.append('AWSAccessKeyId', response.data.data.fields.AWSAccessKeyId);
                formData.append('file', this.state.file);
                if (type == "image") {
                    this.setState({ [type]: [...images, filename] })
                }

                else {
                    this.setState({ [type]: filename })
                }
                return { formData, url: response.data.data.url }
            })
            .then(response => axios.post(response.url, response.formData))
    }


    onContinueClick() {
        this.props.fetchImageDetails({
            images: [...this.state.image, this.state.featured],
            avatar_photo: this.state.image[0],
            featured_image: this.state.featured
        }, `token ${this.props.session.auth_token.authentication_token}`)

        this.props.history.push('/starvideo')
    }
    render() {
        console.log("this.state", this.state)
      
        return (

            <LoginContainer.wrapper>
                <LoginContainer>
                    <LoginContainer.LeftSection>
                        <HeaderSection>
                            <Link to="/">
                                <HeaderSection.LogoImage
                                    src="assets/images/logo_starsona_large.svg"
                                    alt=""
                                />
                            </Link>
                            <Link to="/login">
                                <HeaderSection.RightDiv>LOG IN</HeaderSection.RightDiv>
                            </Link>
                        </HeaderSection>
                    </LoginContainer.LeftSection>
                    <LoginContainer.RightSection>
                        <LoginContainer.FeaturedImage image={this.state.featuredImage}>
                            {/* {this.state.featuredImage != null ?
                            <img src={this.state.featuredImage}/>
                            : */}
                            <LoginContainer.UploadWrapper >
                                <LoginContainer.UploadButton onClick={() => {}}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput id="featuredImage"  onChange={()=> this.onFileChange("featuredImage")} type="file" />
                            </LoginContainer.UploadWrapper>
                            {/* } */}
                        </LoginContainer.FeaturedImage>
                        <LoginContainer.FirstImage image={this.state.firstImage}>
                            <LoginContainer.UploadWrapper>
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput id="firstImage" onChange={()=> this.onFileChange("firstImage")} type="file" />
                            </LoginContainer.UploadWrapper>
                        </LoginContainer.FirstImage>
                        <LoginContainer.SecondImage image={this.state.secondImage}>
                            <LoginContainer.UploadWrapper>
                                <LoginContainer.UploadButton onClick={() => { }}>
                                    +
                                </LoginContainer.UploadButton>
                                <LoginContainer.UploadInput id="secondImage" onChange={()=> this.onFileChange("secondImage")} type="file" />
                            </LoginContainer.UploadWrapper>
                        </LoginContainer.SecondImage>
                    </LoginContainer.RightSection>
                </LoginContainer>
            </LoginContainer.wrapper>
        )
    }
}
