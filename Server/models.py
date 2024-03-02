from pydantic import BaseModel


class Drug(BaseModel):
    is_drug_found: bool = False
    uses: str = ""
    side_effects: str = ""
    drug_name: str = ""
