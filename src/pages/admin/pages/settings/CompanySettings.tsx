import CompanyEditForm from "@/components/edit/CompanyEditForm";
import Spinner from "@/components/spinner/Spinner";
import { IcompanyInfo } from "@/features/config/configSlice";
import { ProfileField } from "@/pages/ProfileView";
import { RootState } from "@/store";
import { Box, Flex, Heading, Icon, Switch, VStack } from "@chakra-ui/react";
import { Settings, User } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CompanySettings() {
  const [isSetting, setIsSetting] = useState(false);

  const { loading, company } = useSelector((state: RootState) => state.config);

  return (
    <Box divideY="2px">
      <Box>
        <Flex
          direction={["column", "row"]}
          align={"center"}
          justify={"space-between"}
          gap={2}
        >
          <Heading as={"h5"} fontSize={["26px", "26px"]}>
            Company
          </Heading>
          <Switch.Root
            checked={isSetting}
            onCheckedChange={(e) => setIsSetting(e.checked)}
            size="lg"
            p={5}
          >
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
              <Switch.Indicator
                fallback={<Icon as={Settings} color="gray.400" />}
              >
                <Icon as={User} color="gray.200" />
              </Switch.Indicator>
            </Switch.Control>
            <Switch.Label>Switch State</Switch.Label>
          </Switch.Root>
        </Flex>
      </Box>
      <Box>
        {!isSetting ? (
          <CompanyDetailView data={company} loading={loading} />
        ) : loading ? (
          <Spinner />
        ) : company ? (
          <VStack align={"start"} gap={2}>
            <CompanyEditForm data={company} />
          </VStack>
        ) : (
          <Box />
        )}
      </Box>
    </Box>
  );
}

type ICompanyDetailsProps = {
  data: IcompanyInfo | null;
  loading: boolean;
};

const CompanyDetailView = (props: ICompanyDetailsProps) => {
  const { data, loading } = props;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : data ? (
        <VStack align={"start"} justify={"start"} gap={4} mx={2}>
          <ProfileField label="Company Name" value={data?.name} />
          <ProfileField label="Code" value={data?.code} />
          <ProfileField label="Address" value={data?.address} />
          <ProfileField label="Email" value={data?.email} />
          <ProfileField label="VatNo" value={data?.vatNo} />
        </VStack>
      ) : (
        <Box />
      )}
    </>
  );
};

export default CompanySettings;
