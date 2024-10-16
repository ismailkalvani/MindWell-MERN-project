import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Card, Image } from "react-bootstrap";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4">
        <Image
          src={user.profileImage || "default-avatar.png"}
          roundedCircle
          width="150"
          height="150"
          className="mb-3 mx-auto d-block"
        />
        <h3 className="text-center">{user.name}</h3>
        <p className="text-center">{user.email}</p>
        {/* Add more profile details if needed */}
      </Card>
    </Container>
  );
};

export default Profile;
