import { expect, test } from "bun:test"
import { getTestFixture } from "tests/fixtures/get-test-fixture"

// Verifies canonical USB-C ports are created when no partsEngine is configured
// without emitting a source_part_not_found_warning (no parts engine is valid).

test("USB-C connector without partsEngine produces canonical ports", async () => {
  const { circuit } = getTestFixture()

  circuit.add(
    <board width="30mm" height="20mm">
      <connector name="J_USB" standard="usb_c" />
      <schematictext
        text="USB-C without partsEngine"
        schX={0}
        schY={-2.5}
        fontSize={0.2}
      />
    </board>,
  )

  await circuit.renderUntilSettled()

  expect(circuit.db.source_part_not_found_warning.list()).toHaveLength(0)
  expect(circuit.db.source_port.list()).toHaveLength(16)
  expect(circuit.db.schematic_port.list()).toHaveLength(16)
  expect(circuit.db.pcb_smtpad.list()).toHaveLength(0)
  expect(circuit).toMatchSchematicSnapshot(import.meta.path)
})
