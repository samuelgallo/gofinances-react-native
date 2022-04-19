import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";
import { TransactionList } from "../../components/TransactionCard/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

import { useTheme } from "styled-components";
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
  Loading,
} from "./styles";

interface HighlightProps {
  amount: string;
  lasTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  );

  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: "positve" | "negative"
  ) {
    const lasTransactions = new Date(
      Math.max.apply(
        Math,
        collection
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    );

    return `${lasTransactions.getDate()} of ${lasTransactions.toLocaleString(
      "en-US",
      { month: "long" }
    )}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transaction";
    const response = await AsyncStorage.getItem(dataKey);

    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });

        const date = Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );
    setData(transactionFormatted);

    const leastTransactionEntries = getLastTransactionDate(
      transactions,
      "positve"
    );

    const leastTransactionExpensives = getLastTransactionDate(
      transactions,
      "negative"
    );

    const totalInterval = `01 to ${leastTransactionExpensives}`;

    let totalValue = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        lasTransaction: `Last entry ${leastTransactionEntries}`,
      },
      expenses: {
        amount: expensiveTotal.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        lasTransaction: `Last exit ${leastTransactionExpensives}`,
      },
      total: {
        amount: totalValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
        lasTransaction: totalInterval,
      },
    });

    //console.log(transactionFormatted);
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
    // const dataKey = "@gofinances:transaction";
    // AsyncStorage.removeItem(dataKey);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <Loading>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </Loading>
      ) : (
        <>
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
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lasTransaction}
            />
            <HighlightCard
              type="down"
              title="Exit"
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lasTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lasTransaction}
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
        </>
      )}
    </Container>
  );
}
