import styled from 'styled-components';
import { Card, Button } from '@mui/material';
import SelectTags from './SelectTags';
import { useState } from 'react';
import { ShopState } from '../util/Type';
import { FlexContainer } from '../../../styles/GlobalStyle';
import React from 'react';
import { getParties, postParty } from '../foodDetailApi';

const ContentContainer = styled(FlexContainer)`
  flex-direction: column;
  width: 60vw;
  justify-content: flex-start;
  margin-bottom: 70px;
`;

const MenuContainer = styled(FlexContainer)`
  width: inherit;
  margin-top: 40px;
  align-items: flex-start;
  justify-content: space-between;
`;

const TitleContainer = styled(FlexContainer)`
  width: inherit;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 0.5px solid black;
  height: 15%;
`;

const Title = styled.div`
  font-size: 40px;
  margin-left: 50px;
`;

type MenuCardProps = {
  width: string;
  size: string;
};

const MenuCard = styled(Card)<MenuCardProps>`
  width: ${(props) => props.width};
  font-size: ${(props) => props.size};
  padding: 20px;
  margin-left: 30px;
  font-size: 20px;
  flex: 2;
  p {
    margin-bottom: 20px;
  }
`;

const ATag = styled.a`
  text-decoration: none;
  color: #1e1f21;
  &:hover {
    color: ${({ theme }) => theme.colors.main};
  }
`;

const SelectContainer = styled.div`
  height: inherit;
`;

const LikeButton = styled(Button)`
  width: 90px;
`;

interface Contentype {
  shop: ShopState;
}

const Content = ({ shop }: Contentype) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const [partyLimit, setpartyLimit] = useState<number>(2);
  const BASEURL = 'https://map.naver.com/v5/entry/place/';

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isClicked) {
      alert('이미 찜한 식당입니다.');
      return;
    }
    const currentParties = await getParties();
    const copyCurrent = [...currentParties];
    console.log(copyCurrent);
    const filteredByShopId = copyCurrent.filter((current) => current.shopId === shop.shopId);
    if (filteredByShopId.length !== 0) {
      alert('이미 모집중인 식당입니다.');
      return;
    }
    const party = {
      shopId: shop.shopId,
      partyLimit,
      timeLimit: 30,
    };
    const message = await postParty(party);
    if (message) {
      setClicked(true);
      alert('식당모임이 생성되었습니다.');
    }
  };

  return (
    <ContentContainer>
      <TitleContainer>
        <Title>
          {shop.name}({shop.category})
        </Title>
        <LikeButton
          variant="contained"
          onClick={handleClick}
          sx={{
            fontSize: '10px',
            marginRight: '30px',
          }}>{`모임생성 ❤`}</LikeButton>
      </TitleContainer>

      <MenuContainer>
        <MenuCard size={'15px'} width={'20vw'}>
          <p>{shop.description}</p>
          <ATag href={`${BASEURL}${shop.address}`} target="_blank" rel="noreferrer">
            주소로 이동하기
          </ATag>
          <p>거리 : {shop.distance}</p>
        </MenuCard>
        <SelectContainer>
          <SelectTags type={'모집인원'} value={partyLimit} setValue={setpartyLimit} />
        </SelectContainer>
      </MenuContainer>
    </ContentContainer>
  );
};

export default React.memo(Content);
