package io.ionic.starter;

import android.os.Bundle;


import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
/* import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider; */
//import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
  //private FirebaseAuth mAuth;

  @Override
  public void onStart(){

    super.onStart();
    /* FirebaseUser currentUser = mAuth.getCurrentUser(); */

    /* GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(this); */
    //updateUI(account);
  }
  private void firebaseAuthWithGoogle(String idToken) {
    /* AuthCredential credential = GoogleAuthProvider.getCredential(idToken, null);
    mAuth.signInWithCredential(credential); */
  }
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    /* mAuth = FirebaseAuth.getInstance();
      GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
      .requestEmail()
        .requestIdToken("947506461654-mrsienuncjouk7qkvgsifirrnsqell68.apps.googleusercontent.com")
        .build();
     GoogleSignInClient mGoogleSignInClient = GoogleSignIn.getClient(this, gso); */

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
     // add(GoogleAuth.class);

    }});
  }
}
