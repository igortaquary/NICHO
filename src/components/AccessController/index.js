import React from "react";
import { useUserContext } from "../../contexts/userContext";

const AccessController = (props) => {
  const { user } = useUserContext();

  if (props.profile === "logado" && user) {
    return props.children;
  } else if (props.profile === "expositor" && user?.isExpositor) {
    return props.children;
  } else if (props.profile === "not-expositor" && user && !user.isExpositor) {
    return props.children;
  } else if (props.profile === "not-logado" && !user) {
    return props.children;
  } else {
    return null;
  }
};

export default AccessController;
