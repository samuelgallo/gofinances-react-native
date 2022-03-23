import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { TransactionList } from "../../components/TransactionCard/styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  LogoutButton,
} from "./styles";

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: 1,
      type: "positive",
      title: "Website development",
      amount: "8.200",
      category: { name: "Sales", icon: "dollar-sign" },
      date: "03/10/2022",
    },
    {
      id: 2,
      type: "negative",
      title: "Five Guys",
      amount: "49.00",
      category: { name: "Food", icon: "coffee" },
      date: "03/10/2022",
    },
    {
      id: 3,
      type: "nagative",
      title: "Rental",
      amount: "1.399",
      category: { name: "Sales", icon: "shopping-bag" },
      date: "03/10/2022",
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/3643301?v=4",
              }}
            />
            <User>
              <UserGreeting>Hi,</UserGreeting>
              <UserName>Samuel</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards
      // horizontal
      // showsHorizontalScrollIndicator={false}
      // contentContainerStyle={{ paddingHorizontal: 24 }}
      >
        <HighlightCard
          type="up"
          title="Entry"
          amount="$ 17.400,00"
          lastTransaction="Last entry April 13"
        />
        <HighlightCard
          type="down"
          title="Exit"
          amount="$ 1.259,00"
          lastTransaction="Last entry April 3"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="$ 19.140,00"
          lastTransaction="From 01 to 16 April"
        />
      </HighlightCards>

      <Transactions>
        <Title>List</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
