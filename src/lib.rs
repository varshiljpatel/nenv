use aes_gcm::{
  aead::{Aead, KeyInit},
  Aes256Gcm, Nonce
};
use napi_derive::napi;
use pbkdf2::pbkdf2_hmac;
use rand::RngCore;
use sha2::Sha256;

const SALT_LEN: usize = 16;
const NONCE_LEN: usize = 12;
const ITERATIONS: u32 = 100_000;

#[napi]
pub fn encrypt_env(env_content: String, password: String) -> Result<String, napi::Error> {
  let mut salt = [0u8; SALT_LEN];
  rand::thread_rng().fill_bytes(&mut salt);
  
  let mut key = [0u8; 32];
  pbkdf2_hmac::<Sha256>(
      password.as_bytes(),
      &salt,
      ITERATIONS,
      &mut key
  );
  
  let cipher = Aes256Gcm::new_from_slice(&key).unwrap();
  let nonce = Nonce::from_slice(&[0u8; NONCE_LEN]);
  
  let ciphertext = cipher.encrypt(nonce, env_content.as_bytes().as_ref())
      .map_err(|e| napi::Error::from_reason(format!("Encryption failed: {}", e)))?;

  let mut output = Vec::with_capacity(SALT_LEN + NONCE_LEN + ciphertext.len());
  output.extend_from_slice(&salt);
  output.extend_from_slice(nonce);
  output.extend_from_slice(&ciphertext);
  
  Ok(hex::encode(output))
}

#[napi]
pub fn decrypt_env(encrypted_content: String, password: String) -> Result<String, napi::Error> {
  let data = hex::decode(encrypted_content)
      .map_err(|e| napi::Error::from_reason(format!("Hex decoding failed: {}", e)))?;
  
  if data.len() < SALT_LEN + NONCE_LEN {
      return Err(napi::Error::from_reason("Invalid encrypted content".to_string()));
  }
  
  let salt = &data[..SALT_LEN];
  let nonce = &data[SALT_LEN..SALT_LEN + NONCE_LEN];
  let ciphertext = &data[SALT_LEN + NONCE_LEN..];
  
  let mut key = [0u8; 32];
  pbkdf2_hmac::<Sha256>(
      password.as_bytes(),
      salt,
      ITERATIONS,
      &mut key
  );
  
  let cipher = Aes256Gcm::new_from_slice(&key).unwrap();
  let plaintext = cipher.decrypt(Nonce::from_slice(nonce), ciphertext)
      .map_err(|e| napi::Error::from_reason(format!("Decryption failed: {}", e)))?;
  
  String::from_utf8(plaintext)
      .map_err(|e| napi::Error::from_reason(format!("UTF-8 conversion failed: {}", e)))
}